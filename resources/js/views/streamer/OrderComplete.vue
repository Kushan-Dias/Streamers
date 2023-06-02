<template>
  <main class="main-wrapper">
    <!-- <h1>Sold Items for Coupon: {{ couponCode }}</h1> -->
    <!-- <div  v-for="user in users">
      <p class="animate__animated animate__bounce animate__delay-2s animate__fadeInLeft">New purchase from {{ user.first_name }} <br> for coupon {{ user.coupon_code }}<br>
      Total of {{ user.total }}</p>
    </div> -->
    <div class="card" v-for="user in users">
      <p class="animate__animated animate__fadeInLeft">New purchase from {{ user.first_name }} <br> for coupon {{ user.coupon_code }}<br>
      Total of {{ user.total }}</p>
    </div>
    <!-- <div>
    <ul>
      <li v-for="user in users" :key="user.id">
        <span>{{ user.first_name }}</span>
        <span>{{ user.coupon_code }}</span>
        <span>{{ user.total }}</span>
      </li>
    </ul>
  </div> -->
  </main>
</template>

<script>
import 'animate.css';
export default {
  name: "OrderComplete",
  //order complete
  // data() {
  //   return {
  //     uuid: this.$route.params.uuid || "fb12ed44-beca-41a3-87e0-e8e67807a939",
  //     couponCode: this.$route.params.couponCode || "AAA10",
  //     soldItems: [],
  //   };
  // },
  // created() {
  //   if (this.uuid === undefined || this.uuid == null || this.uuid === "" || this.couponCode === undefined || this.couponCode === "") {
  //     this.$router.push('/');
  //   }
  // },
  // mounted() {
  //   window.Echo.channel(`User.${this.uuid}.Coupon.${this.couponCode}.StoreOrderComplete`).listen('StoreOrderComplete', (e) => {
  //     console.log(e);
  //     this.soldItems.push(e);
  //   });
  // },
  data() {
    return {
      users: [],
    };
  },

  mounted() {
    this.fetchUsers();
  },
  // methods: {
  //   fetchUsers() {
  //     axios.get('http://yugo.localhost:8000/api/product/productlist')
  //       .then(response => {
  //         this.users = response.data;
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   },
  // },
  methods: {
    fetchUsers() {
      fetch('http://yugo.localhost:8000/api/product/productlist')
        .then(response => response.json())
        .then(data => {
          this.users = data;
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>

<style>
.card {
  position: relative;
  width: 250px;
  padding: 10px;
  color: beige;
  background-color: #262c2c;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  animation: fadeOut 5s ease forwards;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
}

body {
  /*background-color: transparent !important;*/
}

</style>
