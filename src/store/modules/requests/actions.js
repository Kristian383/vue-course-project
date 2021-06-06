export default {
    async contactCoach(context, payload) {
        const newRequest = {
            userEmail: payload.email,
            message: payload.message,
            // coachId: payload.coachId,
        };

        const response = await fetch(`https://vue-http-project-496c1-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
            method: "POST",
            body: JSON.stringify(newRequest)
        })

        const responseData = await response.json();


        if (!response.ok) {
            const error = new Error(responseData.message || "failed to send request")
            throw error;
        }

        newRequest.id = responseData.name;
        newRequest.coachId = payload.coachId;

        context.commit("addRequest", newRequest);
    },
    async fetchRequests(context) {
        const coachId = context.rootGetters.userId;
        const token = context.rootGetters.token;

        const response = await fetch(`https://vue-http-project-496c1-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`);

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || "failed to fetch request")
            throw error;
        }

        const requests = [];
        for (const key in responseData) {
            const request = {
                id: key,
                coachId,
                userEmail: responseData[key].userEmail,
                message: responseData[key].message
            }
            requests.push(request)
        }

        context.commit("setRequests", requests)
    }
}