export class AuthService {
  loggedIn = false;

  //   simulate that this takes some time to finish because maybe we reach out to a server, hence using promise. Promise will always take a method/function as an argument

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800);
    });
    return promise;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
