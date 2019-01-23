componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
        })

      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false,
        })
      }
    })
  }

  componentDidMount(){
    this.db = app.database().ref().child('accounts');
    const { accounts } = this.state;
    this.db.on('child_added', snap => {
      var entry = snap.val();
      accounts[entry.id] = (entry);
      this.setState({ accounts });
      if(this.state.currentUser){
        if(this.state.currentUser.uid == snap.val().id){
          this.setState({ username: snap.val().username, account:snap.val(), loading: false });
        }
      }
    })
  }