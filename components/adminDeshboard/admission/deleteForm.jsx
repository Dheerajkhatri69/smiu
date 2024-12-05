const deleteUser = (state, cnic) => {
    return [
        state.finalStepUploadDocuments && (() => deleteuploadDocuments(cnic)),
        state.academicData && (() => deleteacademicData(cnic)),
        state.degreeProgramInformation && (() => deletedegreeProgramInformation(cnic)),
        state.guardiansData && (() => deleteguardiansData(cnic)),
        state.personalData && (() => deletepersonaldata(cnic)),
        () => deleteadmissionstate(cnic),
    ].filter(Boolean); // Removes any falsy steps
};

const deleteadmissionstate = async (cnic) => {
    try {
        const response = await fetch(`/api/admission/admissionstate/${cnic}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) return true; // Success
        const data = await response.json();
        console.error("Error:", data.error || data.message);
        return false; // Failure
    } catch (error) {
        console.error("Error deleting admission state:", error);
        return false;
    }
};


const deletepersonaldata = async (cnic) => {
    try {
        const response = await fetch("/api/admission/personaldataExiste/usingCnic", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cnic }),
        });
        const data = await response.json();

        if (response.ok) {
            return true; // Success message
        } else {
            alert(data.error || data.message); // Error message
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        alert("An error occurred while deleting the user.");
    }
}
const deleteuploadDocuments = async (cnic) => {
    try {
        const response = await fetch("/api/admission/uploadDocuments/uploadDocumentsExiste", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cnic }),
        });
        const data = await response.json();

        if (response.ok) {
            return true; // Success message
        } else {
            alert(data.error || data.message); // Error message
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        alert("An error occurred while deleting the user.");
    }
}

const deletedegreeProgramInformation = async (cnic) => {
    try {
        const response = await fetch("/api/admission/degreeProgramInformation/degreeProgramInformationExiste", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cnic }),
        });
        const data = await response.json();

        if (response.ok) {
            return true; // Success message
        } else {
            alert(data.error || data.message); // Error message
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        alert("An error occurred while deleting the user.");
    }
}
const deleteacademicData = async (cnic) => {
    try {
        const response = await fetch("/api/admission/academicData/academicDataExiste", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cnic }),
        });
        const data = await response.json();

        if (response.ok) {
            return true; // Success message
        } else {
            alert(data.error || data.message); // Error message
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        alert("An error occurred while deleting the user.");
    }
}

const deleteguardiansData = async (cnic) => {
    try {
        const response = await fetch("/api/admission/guardiansData/guardiansDataExiste", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cnic }),
        });
        const data = await response.json();

        if (response.ok) {
            return true; // Success message
        } else {
            alert(data.error || data.message); // Error message
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        alert("An error occurred while deleting the user.");
    }
}

export default deleteUser