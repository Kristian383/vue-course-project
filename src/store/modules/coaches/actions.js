export default {
    registerCoach(context, payload) {
        const coach = {
            firstName: payload.first,
            lastName: payload.last,
            areas: payload.areas,
            description: payload.desc,
            hourlyRate: payload.rate,
            id: context.rootGetters.userId
        };
        context.commit("registerCoach", coach)
    }
}