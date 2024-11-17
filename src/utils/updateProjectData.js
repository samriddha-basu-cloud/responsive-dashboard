import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase"; // Adjust the path to your Firebase configuration

/**
 * Update a specific project with new section data for the logged-in user.
 * @param {string} projectId - The ID of the project to update.
 * @param {object} sectionData - The section data to update within the project.
 */
const updateProjectData = async (projectId, sectionData) => {
  const user = auth.currentUser;
  if (!user) {
    console.error("No user is logged in");
    return;
  }

  const userDocRef = doc(db, "users", user.uid);

  try {
    // Retrieve the user's document
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();

      // Update the project in the projects array
      const updatedProjects = userData.projects.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            sections: {
              ...(project.sections || {}),
              ...sectionData,
            },
          };
        }
        return project;
      });

      // Update the user's document with the modified projects array
      await updateDoc(userDocRef, { projects: updatedProjects });
      console.log("Project data updated successfully.");
    } else {
      console.error("User document does not exist.");
    }
  } catch (error) {
    console.error("Error updating project data:", error);
  }
};

export default updateProjectData;