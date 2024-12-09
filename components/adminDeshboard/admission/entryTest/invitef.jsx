// Function to check if the invite exists
const checkInviteExistence = async (cnic) => {
    try {
        const res = await fetch('/api/admission/entryTestQ/inviteStd/inviteStdExiste', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cnic }), // Send the CNIC as payload
        });

        const data = await res.json();

        if (data.exists) {
            return data.data;  // If exists, show the data
        } else {
            return data.exists;  // No data found
        }

    } catch (err) {
        console.error('Error checking invite:', err);
        throw new Error('Server error');
    }
};

// Function to invite for the entry test
const inviteForEntryTest = async (data) => {
    try {
        const response = await fetch("/api/admission/entryTestQ/inviteStd", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Check if the response is OK (status code 2xx)
        if (!response.ok) {
            console.error(`Failed to invite: ${response.status} ${response.statusText}`);
            return false; // Return false for failure
        }

        // Parse the response
        const result = await response.json();

        // Check if the response contains the expected `success` field
        if (result && result.success) {
            return true; // Operation succeeded
        } else {
            console.error(`API response error:`, result);
            return false; // Return false if success is not true
        }
    } catch (error) {
        console.error("Error occurred while inviting for entry test:", error);
        return false; // Return false in case of an exception
    }
};

// Named exports
export { checkInviteExistence, inviteForEntryTest };
