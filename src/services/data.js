// src/services/data.js

import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  doc,
  getDoc,
  updateDoc,
  increment,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const CACHE_KEY = "cached_categories";
// const CACHE_DURATION = 1000 * 60 * 1; // 1 minutes

// 0 MINUTES FOR DEV, 1 minute for PROD
const CACHE_DURATION = 1000 * 60 * 0; // 0 minutes

export async function getAllCategories() {
  try {
    // =========================
    // 1. CHECK LOCAL CACHE
    // =========================

    const cachedData = localStorage.getItem(CACHE_KEY);

    if (cachedData) {
      const parsed = JSON.parse(cachedData);

      const isCacheValid = Date.now() - parsed.timestamp < CACHE_DURATION;

      if (isCacheValid) {
        return parsed.data;
      }
    }

    // =========================
    // 2. FIRESTORE QUERY
    // =========================

    const q = query(
      collection(db, "categories"),
      orderBy("order", "asc"),
      limit(20),
    );

    const querySnapshot = await getDocs(q);

    // =========================
    // 3. OPTIMIZE DATA
    // =========================

    const categories = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,

        title: data.title || "",
        icon: data.icon || "",
        order: data.order || 0,

        // FILTER HIDDEN VIDEOS
        videos: data.videos?.filter((video) => !video.hidden) || [],
      };
    });

    // =========================
    // 4. SAVE TO CACHE
    // =========================

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        data: categories,
      }),
    );

    return categories;
  } catch (error) {
    console.error("ERROR IN getAllCategories", error);

    return [];
  }
}

// GET SINGLE VIDEO BY ID

export async function getVideoById(videoId) {
  try {
    // FIRST CHECK CACHE
    const cachedData = localStorage.getItem(CACHE_KEY);

    if (cachedData) {
      const parsed = JSON.parse(cachedData);

      for (const category of parsed.data) {
        const foundVideo = category.videos?.find(
          (video) => video.id === videoId,
        );

        if (foundVideo) {
          return {
            video: foundVideo,

            recommendedVideos:
              category.videos?.filter((video) => !video.hidden) || [],
          };
        }
      }
    }

    // FALLBACK TO FIRESTORE
    const q = query(
      collection(db, "categories"),
      orderBy("order", "asc"),
      limit(20),
    );

    const querySnapshot = await getDocs(q);

    for (const doc of querySnapshot.docs) {
      const data = doc.data();

      const visibleVideos = data.videos?.filter((video) => !video.hidden) || [];

      const foundVideo = visibleVideos.find((video) => video.id === videoId);

      if (foundVideo) {
        return {
          video: foundVideo,

          recommendedVideos: visibleVideos,
        };
      }
    }

    return null;
  } catch (error) {
    console.error("ERROR IN getVideoById", error);

    return null;
  }
}

// INCREMENT VIDEO VIEWS

export async function incrementVideoViews(videoId) {
  try {
    const categoriesRef = collection(db, "categories");

    const querySnapshot = await getDocs(categoriesRef);

    for (const categoryDoc of querySnapshot.docs) {
      const data = categoryDoc.data();

      const videos = data.videos || [];

      const videoIndex = videos.findIndex((video) => video.id === videoId);

      if (videoIndex !== -1) {
        // INCREMENT LOCALLY
        videos[videoIndex].views = (videos[videoIndex].views || 0) + 1;

        // UPDATE FIRESTORE
        await updateDoc(doc(db, "categories", categoryDoc.id), {
          videos,
        });

        // UPDATE CACHE
        const cachedData = localStorage.getItem(CACHE_KEY);

        if (cachedData) {
          const parsed = JSON.parse(cachedData);

          const updatedCategories = parsed.data.map((category) => {
            if (category.id === categoryDoc.id) {
              return {
                ...category,
                videos: category.videos.map((video) =>
                  video.id === videoId
                    ? {
                        ...video,
                        views: (video.views || 0) + 1,
                      }
                    : video,
                ),
              };
            }

            return category;
          });

          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              timestamp: Date.now(),
              data: updatedCategories,
            }),
          );
        }

        return;
      }
    }
  } catch (error) {
    console.error("ERROR IN incrementVideoViews", error);
  }
}

export async function getAllChannels() {
  try {
    const q = query(collection(db, "channels"), orderBy("createdAt", "desc"));

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getThemeSettings() {
  try {
    const docRef = doc(db, "settings", "theme");

    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) return null;

    return snapshot.data();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// SAVE CONTACT FORM MESSAGE

export async function saveContactMessage(name, email, message) {
  try {
    const docRef = await addDoc(collection(db, "contactMessages"), {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      id: docRef.id,
    };
  } catch (error) {
    console.error("ERROR IN saveContactMessage", error);

    return {
      success: false,
      error: error.message,
    };
  }
}
