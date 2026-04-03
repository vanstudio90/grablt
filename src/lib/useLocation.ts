"use client";

import { useState, useEffect, useCallback } from "react";

interface LocationData {
  city: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  source: "gps" | "ip" | "manual" | "default";
}

const DEFAULT_LOCATION: LocationData = {
  city: "Los Angeles",
  region: "California",
  country: "US",
  lat: 34.0522,
  lon: -118.2437,
  source: "default",
};

const STORAGE_KEY = "buyormeet_location";
const RADIUS_KEY = "buyormeet_radius";

export function useLocation() {
  const [location, setLocation] = useState<LocationData>(DEFAULT_LOCATION);
  const [radius, setRadiusState] = useState(25);
  const [loading, setLoading] = useState(true);
  const [permissionAsked, setPermissionAsked] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);

  useEffect(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    const cachedRadius = localStorage.getItem(RADIUS_KEY);
    if (cachedRadius) setRadiusState(Number(cachedRadius));

    if (cached) {
      try {
        setLocation(JSON.parse(cached));
        setLoading(false);
        return;
      } catch { /* ignore */ }
    }

    // IP-based fallback
    fetch("https://ipapi.co/json/")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.city) {
          const loc: LocationData = {
            city: data.city,
            region: data.region || "",
            country: data.country_code || "US",
            lat: data.latitude || 0,
            lon: data.longitude || 0,
            source: "ip",
          };
          setLocation(loc);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(loc));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const requestGPSLocation = useCallback(() => {
    setPermissionAsked(true);
    setGpsLoading(true);

    if (!navigator.geolocation) {
      setGpsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        let city = "Your Area";
        let region = "";

        try {
          // Use Nominatim (free, no API key needed)
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`,
            { headers: { "Accept-Language": "en" } }
          );
          if (res.ok) {
            const data = await res.json();
            const addr = data.address || {};
            city = addr.city || addr.town || addr.village || addr.county || city;
            region = addr.state || region;
          }
        } catch {
          // Use coords only
        }

        const loc: LocationData = {
          city,
          region,
          country: "US",
          lat: latitude,
          lon: longitude,
          source: "gps",
        };
        setLocation(loc);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(loc));
        setGpsLoading(false);
      },
      () => {
        // Permission denied
        setGpsLoading(false);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  }, []);

  const setManualLocation = (city: string, region: string) => {
    const loc: LocationData = {
      city,
      region,
      country: "US",
      lat: 0,
      lon: 0,
      source: "manual",
    };
    setLocation(loc);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loc));
  };

  const setRadius = (r: number) => {
    setRadiusState(r);
    localStorage.setItem(RADIUS_KEY, r.toString());
  };

  const displayLocation = `${location.city}${location.region ? `, ${location.region}` : ""}`;

  return {
    location,
    radius,
    loading,
    gpsLoading,
    permissionAsked,
    displayLocation,
    requestGPSLocation,
    setManualLocation,
    setRadius,
  };
}
