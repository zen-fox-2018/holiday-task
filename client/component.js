Vue.component('login-component', {
  template: "#login-template",
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    loginMethod() {
      this.$emit('login-method', {
        email: this.email,
        password: this.password
      })
      this.email = '',
      this.password = ''
    }
  }
})

Vue.component('card-profile-component', {
  template: "#card-profile-template", 
  props: ['data', 'transactions'],
  data() {
    return {
      edit: false,
      name: '',
      email: '',
      listTransactions: false
    }
  },
  methods: {
    logout() {
      this.$emit('logout')
    },
    editMethod() {
      this.edit = true
    },
    submitData() {
      this.$emit('edit-method', {
        whitelist: ['name', 'email'],
        data: {
          email: this.email,
          name: this.name
        }
      })
      this.edit = false
    },
    getUserTransactions() {
      if (this.listTransactions) this.listTransactions = false
      else this.listTransactions = true
      this.$emit('get-user-transactions')
    }
  },
  watch: {
    data() {
      this.name = this.data.name,
      this.email = this.data.email
    }
  }
})

Vue.component('edit-profile-component', {
  template: "#edit-profile-template",
  props: ['profile'],
  data() {
    return {
      name: '',
      email: ''
    }
  }
})

Vue.component('list-reward-component', {
  template: "#list-reward-template",
  props: ['rewards']
})

Vue.component('list-product-component', {
  template: "#list-product-template",
  props: ['products'],
  data() {
    return {
      click: 0,
      timer: null,
      product: {}
    }
  },
  methods: {
    buyMethod(product) {
      this.click++
      this.product = product
      let self = this
      if(this.click >= 1) {
        this.timer = setTimeout(() => {
          self.click = 0
          self.product = {}
        }, 800)
      } else {
        clearTimeout(this.timer);
        this.click = 0
        this.product = {}
      }
    },
    addToCart() {
      this.$emit('add-to-cart', this.product)
    }
  },
  watch: {
    click() {
      if(this.click === 2) {
        this.addToCart()
      }
    }
  }
})

Vue.component('cart-component', {
  template: "#cart-template",
  props: ['transactions', 'cart', 'total'],
  data() {
    return {
      checkout: false
    }
  },
  methods: {
    checkoutMethod() {
      this.checkout = true
    },
    createTransactions() {
      this.$emit('create-transactions')
      this.checkout = false
    }
  }
})