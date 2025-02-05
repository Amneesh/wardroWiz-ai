import { firebase } from "./firebase.js";

import {
  collection,
  getFirestore,
  addDoc,
  onSnapshot,
  query,
  getDocs,
  getCountFromServer,
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { genreateOutfit } from "./outfitsearch.js";

// Method to upload outfit image to Firebase Storage
export const uploadImageToStorage = (imageData, folderName) => {
  return firebase.uploadToStorage(imageData, folderName);
};

// Method to add outfit data to Firestore
export const saveOutfitToDb = (data) => {
  return firebase.dbSave(data, "outfit-info", "outfit");
};

// Method to add history data to Firestore
export const saveHistoryToDb = (data) => {
  return firebase.dbSave(data, "history", "historyOutfit");
};

// Method to add favorite data to Firestore
export const saveFavoriteToDb = (data) => {
  return firebase.dbSave(data, "favorites", "favfit");
};

// Method to add user profile data to Firestore
export const saveProfileToDb = (data) => {
  return firebase.dbSave(data, "user-profile", "profile");
};

let outfitArray = [];
let favoriteArray = [];
let historyArray = [];

// Method to load outfit data from Firestore
export const loadOutfitData = () => {
  const q = query(
    collection(
      firebase.getDB(),
      "outfit-info",
      firebase.getUser().email,
      "outfit"
    )
  );

  onSnapshot(q, (querySnapshot) => {
    outfitArray = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log(outfitArray);
  });
  return outfitArray;

};

export const deleteOufitDoc = (docId) => {
  const db = firebase.getDB();
  const docRef = doc(db, "outfit-info", firebase.getUser().email, "outfit", docId);
  deleteDoc(docRef)
    .then(() => {
      console.log("Document deleted successfully");
      wardrowizAlert('Document deleted successfully');
    })
    .catch((error) => {
      console.error("Error deleting document: ", error);
      wardrowizAlert('Please try again');

    });
};

export const deleteFavDoc = (docId) => {
  const db = firebase.getDB();
  const docRef = doc(db, "outfit-info", firebase.getUser().email, "outfit", docId);
  deleteDoc(docRef)
    .then(() => {
      console.log("Document deleted successfully");
      wardrowizAlert('Document deleted successfully');
    })
    .catch((error) => {
      console.error("Error deleting document: ", error);
      wardrowizAlert('Please try again');

    });
};

export const loadFavouritesData = () => {
  const q = query(
    collection(
      firebase.getDB(),
      "favorites",
      firebase.getUser().email,
      "favfit"
    )
  );

  return new Promise((resolve, reject) => {
    onSnapshot(q, (querySnapshot) => {
      const favoriteArray = querySnapshot.docs.map((doc) => ({ id: doc.id,...doc.data() }));
      console.log(favoriteArray);
      resolve(favoriteArray);
    }, (error) => {
      reject(error);
    });
  });
};



export const loadHistoryData = () => {
  const q = query(
    collection(
      firebase.getDB(),
      "history",
      firebase.getUser().email,
      "outfit"
    )
  );

  onSnapshot(q, (querySnapshot) => {
    historyArray = querySnapshot.docs.map((doc) => doc.data());
  });
};


// Method to load user profile data from Firestore
export const loadUserProfile = async () => {
  const q = query(
    collection(
      firebase.getDB(),
      "user-profile",
      firebase.getUser().email,
      "profile"
    )
  );

  try {
    const docs = await getDocs(q);
    return docs;
  } catch (error) {
    console.error("Error loading user profile:", error);
  }
};

//  update user profile

export const updateDataName = async (userDocumentID, dataName, dataGender) => {

  updateDoc(doc(firebase.getDB(), "user-profile", firebase.getUser().email, "profile", userDocumentID), {
    name: dataName,
    gender: dataGender,
  });
}


export const updateDataImage = async (userDocumentID, dataImage) => {

  updateDoc(doc(firebase.getDB(), "user-profile", firebase.getUser().email, "profile", userDocumentID), {
    profileImageUrl: dataImage
  });
}




// Method to get Favourites
// export const getFavourites = () => {
//   return favoriteArray;
// };

// Method to get History
export const getHistory = () => {
  return historyArray;
};


// Method to get outfits by category
export const getOutfitsByCategory = (category) => {
  return outfitArray.filter((outfit) => outfit.garment_type === category);
};


// Method to get outfit count
export const getOutfitCount = async () => {
  return outfitArray.length;
};

// Method to get unique outfit categories
export const getOutfitCategories = () => {
  const categories = new Set();
  outfitArray.forEach((outfit) => categories.add(outfit.garment_type));
  return Array.from(categories);
};

// Method to sign out the user
export const userSignOut = async () => {
  try {
    const status = await firebase.userSignOut();
    if (status) {
      window.location.href = "#home";
    }
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

// Method to sign in the user
export const userSignIn = async () => {
  try {
    const status = await firebase.userSignIn();

  } catch (error) {
    console.error("Error signing in:", error);
  }
};

export const resetPassword = async (email) => {
  try {
    const status = await firebase.resetPassword(email);
 
  } catch (error) {
  }
};

// Method to start the camera
export const startCamera = (video) => {
  if (video && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
      })
      .catch((error) => {
        console.error("Error starting camera:", error);
      });
  }
};

// Method to stop the camera
export const stopCamera = (video) => {
  if (video && video.srcObject) {
    const tracks = video.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
  }
};

//Genreate Outfit

export const genreateOutfits = () => {
  return genreateOutfit(
    getOutfitsByCategory("top"),
    getOutfitsByCategory("bottom"),
    "Auto"
  );
};


/* 
// Usage
(async () => {
  try {
    const position = await getLocation();
    console.log("Geolocation obtained successfully:", position);
  } catch (error) {
    console.error("Error obtaining geolocation:", error);
  }
})(); */



export const colorThief = new ColorThief();


export const getFileAsBase64 = async (url) => {
  // Fetch the file from the URL
  const response = await fetch(url);
  const blob = await response.blob();

  // Use FileReader to read the file and convert it to Base64
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result.split(',')[1]); // Base64 string without the "data:" prefix
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(blob);
  });
}




export function wardrowizAlert(message) {
  const asideElement = document.createElement('aside');

  asideElement.innerHTML = `
  <section>
    <div class="popup">
      <div class="popup-content" id="popupContent">
        <p></p>
      </div>
    </div>
  </section>
`;

  document.body.appendChild(asideElement);

  const popuptext = document.getElementById('popupContent');
  const popup = document.querySelector('.popup');
  popuptext.innerHTML = message;
  popup.classList.add('show');
  setTimeout(() => {
    popup.classList.remove('show');
  }, 2000);
}