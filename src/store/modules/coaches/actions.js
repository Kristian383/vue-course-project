export default {
    registerCoach(context, payload) {
        const coach = {
            firstName: payload.first,
            lastName: payload.last,
            areas: payload.areas,
            description: payload.desc,
            hourlyRate: payload.rate,
            id:"c3"
        };

        context.commit("registerCoach",coach)
    }
}