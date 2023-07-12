// stores/counter.js
import { defineStore } from "pinia";
import axios from "axios";
import router from "../routers/router";

export const useMainStore = defineStore("counter", {
  state: () => ({
    baseUrl: "http://localhost:3000",
    isLogged: localStorage.getItem("access_token") ? true : false,
    showModal: false,
    order: null,
    showCalculation: null,
    selectedQuantities: null,
    receipt: null,
  }),
  getters: {},
  actions: {
    async signIn(userData) {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${this.baseUrl}/user/sign-in`,
          data: userData,
        });

        this.isLogged = true;
        localStorage.setItem("email", data.email);
        await localStorage.setItem("access_token", data.access_token);
        this.fetchData();
        router.push("/");

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Succesfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Login Problem",
          text: "Please, check your email & password again",
        });
      }
    },

    async signUp(userData) {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${this.baseUrl}/user/sign-up`,
          data: userData,
        });

        localStorage.setItem("email", data.email);
        this.isLogged = true;
        await localStorage.setItem("access_token", data.access_token);
        router.push("/");

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Register Succesfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Register Problem",
          text: "Please, check your email & password again",
        });
      }
    },

    async LogOut() {
      try {
        await localStorage.removeItem("access_token");
        this.isLogged = false;
        localStorage.removeItem("email");
        router.push("/sign-in");

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Log Out Succesfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Log Out Problem",
          text: "Sorry, for the inconvenience",
        });
      }
    },

    async toggleModal(modal) {
      this.showModal = modal;
    },

    async fetchData() {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${this.baseUrl}/order/my-order`,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.order = data;
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Fetch Data is Failed",
          text: "Sorry, for the inconvenience",
        });
      }
    },

    async submitOrder(dataInput) {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${this.baseUrl}/order/add-order`,
          headers: {
            access_token: localStorage.access_token,
          },
          data: dataInput,
        });

        await this.fetchData();
        router.push("/");

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Add Your Order",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed to Submit Order",
          text: "Sorry, for the inconvenience",
        });
      }
    },

    async calculateReceipt(order) {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${this.baseUrl}/order/calculate-order`,
          headers: {
            access_token: localStorage.access_token,
          },
          data: order,
        });

        this.showCalculation = data;
        this.toggleModal("Calculate");
      } catch (error) {
        console.log(error);
      }
    },

    async sendSelectedQuantities(product) {
      this.selectedQuantities = product;
    },

    async confirmMyOrder(order) {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${this.baseUrl}/order/confirm-order`,
          headers: {
            access_token: localStorage.access_token,
          },
          data: order,
        });
        await this.fetchData();
        this.toggleModal("Close");

        if (data.success) {
          const filePath = data.fileName;
          console.log(data.filePath, "<<< filepath");
          const downloadUrl = `${
            this.baseUrl
          }/download?file=${encodeURIComponent(filePath)}`;
          try {
            const response = await axios({
              method: "GET",
              url: downloadUrl,
              responseType: "blob",
            });
            const fileUrl = window.URL.createObjectURL(
              new Blob([response.data])
            );

            const link = document.createElement("a");
            link.href = fileUrl;
            link.setAttribute("download", filePath);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(fileUrl);
          } catch (error) {
            console.error("Failed to download file:", error);
          }
        }

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "CalculateTaxes Successfully",
          text: "Invoices has been sent",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.log(error);
      }
    },

    async submitForm(dataInput) {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${this.baseUrl}/order/make-order`,
          data: dataInput,
          headers: {
            access_token: localStorage.access_token,
          },
        });

        await this.fetchData();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Add Successfully",
          text: "Payment Confirmed",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.log(error);
      }
    },

    async clearCart() {
      this.selectedQuantities = null;
    },
  },
});
