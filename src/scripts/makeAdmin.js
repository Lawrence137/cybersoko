const admin = require("firebase-admin");

// Initialize Firebase Admin
const serviceAccount = require("../../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const makeAdmin = async (userId) => {
  try {
    await db.collection("users").doc(userId).set({
      isAdmin: true,
      email: "kimaninjoroge96@gmail.com",
    });
    console.log(`User ${userId} has been set as admin.`);
  } catch (error) {
    console.error("Error setting admin:", error);
  }
};

// Replace with the actual userId
const userId = "hocT3B7OFOdR4dcu4rPyi77oTZi2";
makeAdmin(userId).then(() => process.exit());