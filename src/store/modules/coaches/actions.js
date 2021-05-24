export default {
    async registerCoach(context, payload) {
        const userId = context.rootGetters.userId;
        const coach = {
            firstName: payload.first,
            lastName: payload.last,
            areas: payload.areas,
            description: payload.desc,
            hourlyRate: payload.rate,
        };

        const response = await fetch(`https://vue-http-project-496c1-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
            method: "PUT",
            body: JSON.stringify(coach) //converting object to json format
        });

        //const responseData=await response.json();     //parsed data

        if (!response.ok) {
            //error
        }


        context.commit("registerCoach", {
            ...coach,
            id: userId
        })
    },
    async loadCoaches(context) {
        const response = await fetch(`https://vue-http-project-496c1-default-rtdb.firebaseio.com/coaches.json`);

        const responseData = await response.json();

        if (!response.ok) {
            //eror
        }

        const coaches = [];

        for (const key in responseData) { //key is coach id
            const coach = {
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                areas: responseData[key].areas,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                id: key
            }
            coaches.push(coach)
        }
        context.commit("setCoaches",coaches)
    }
}