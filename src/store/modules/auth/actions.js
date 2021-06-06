let timer;
export default {
    async login(context, payload) {

        context.dispatch("auth", {
            ...payload,
            mode: "login"
        })
    },
    async signUp(context, payload) {
        context.dispatch("auth", {
            ...payload,
            mode: "signup"
        })
    },
    logout(context) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("tokenExpiration");

        clearTimeout(timer);

        context.commit("setUser", {
            userId: null,
            token: null,
        })


    },
    async auth(context, payload) {
        const mode = payload.mode;
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCdYAJtjGHY0MN2MUC8jM2uGEq6aP4weEU`;

        if (mode === "signup") {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCdYAJtjGHY0MN2MUC8jM2uGEq6aP4weEU`;
        }
        const response = await fetch(url,
            {
                method: "POST",
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                })
            });

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to authenticate.');
            throw error;
        }

        // const expiresIn = +responseData.expiresIn * 1000;
         const expiresIn = 5000;
        const expirationDate = new Date().getTime() + expiresIn;

        localStorage.setItem("tokenExpiration", expirationDate)
        localStorage.setItem("token", responseData.idToken);
        localStorage.setItem("userId", responseData.localId);

        timer = setTimeout(function () {
            context.dispatch("autoLogout")
        }, expiresIn)

        context.commit("setUser", {
            token: responseData.idToken,
            userId: responseData.localId,
        })
    },
    tryLogin(context) {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const tokenExpiration = localStorage.getItem("tokenExpiration")

        const expiresIn = +tokenExpiration - new Date().getTime();

        if (expiresIn < 0) {
            return;
        }

        timer = setTimeout(() => {
            context.dispatch("autoLogout")
        }, expiresIn);
        
        if (token && userId) {
            context.commit("setUser", {
                token: token,
                userId: userId,
            })
        }
    },
    autoLogout(context)
    {
        context.dispatch("logout")
        context.commit("setAutoLogout")
    }
} //test@test.com