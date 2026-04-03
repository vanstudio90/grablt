"use client";

import { useState, useEffect } from "react";

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

  useEffect(() => {
    // Check cached location first
    const cached = localStorage.getItem(STORAGE_KEY);
    const cachedRadius = localStorage.getItem(RADIUS_KEY);
    if (cachedRadius) setRadiusState(Number(cachedRadius));

    if (cached) {
      try {
        setLocation(JSON.parse(cached));
        setLoading(false);
        return;
      } catch {}
    }

    // IP-based fallback for first visit
    fetchIPLocation();
  }, []);

  const fetchIPLocation = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      if (res.ok) {
        const data = await res.json();
        const loc: LocationData = {
          city: data.city || "Los Angeles",
          region: data.region || "California",
          country: data.country_code || "US",
          lat: data.latitude || 34.0522,
          lon: data.longitude || -118.2437,
          source: "ip",
        };
        setLocation(loc);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(loc));
      }
    } catch {
      // Keep default
    }
    setLoading(false);
  };

  const requestGPSLocation = () => {
    setPermissionAsked(true);
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          // Reverse geocode
          const res = await fetch(
            `https://ipapi.co/${pos.coords.latitude},${pos.coords.longitude}/json/`
          );
          let city = "Your Area";
          let region = "";
          if (res.ok) {
            const data = await res.json();
            city = data.city || city;
            region = data.region || region;
          }
          const loc: LocationData = {
            city,
            region,
            country: "US",
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            source: "gps",
          };
          setLocation(loc);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(loc));
        } catch {
          // GPS coords without reverse geocode
          const loc: LocationData = {
            city: "Your Area",
            region: "",
            country: "US",
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            source: "gps",
          };
          setLocation(loc);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(loc));
        }
      },
      () => {
        // Permission denied — keep IP/default
      }
    );
  };

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
    permissionAsked,
    displayLocation,
    requestGPSLocation,
    setManualLocation,
    setRadius,
  };
}
