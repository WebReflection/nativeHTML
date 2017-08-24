const NativeHTML = require('nativehtml');

exports.createPage = () => new NativeHTML({
  // some place for Page data/state
  model: {
    name: 'nativeHTML is cool \\o/',
    icon: '',
    counter: 12
  },
  // right before the page is created
  init() {
    // example just to reuse same function each time
    this.decrease = this.decrease.bind(this);
    // setInterval(this.decrease, 1000);
  },
  // decrease the counter and update the view
  decrease(e) {
    this.model.counter--;
    this.update();
  },
  // return some message, accordingly with the counter value
  get message() {
    return this.model.counter <= 0 ?
      'Hoorraaay! You unlocked the NativeScript clicker achievement!' :
      (this.model.counter + ' taps left')
  },
  // render the view. Both render and document properties are assigned automatically
  update() {
    this.render`
    <Page.actionBar>
        <ActionBar title=${this.model.name} icon=${this.model.icon} class="action-bar" />
    </Page.actionBar>
    <StackLayout class="p-20">
        <Label text="Tap the button" class="h1 text-center" />
        <Button text="TAP" tap=${this.decrease} class="btn btn-primary btn-active" />
        <Label text=${this.message} class="h2 text-center" textWrap="true" />
    </StackLayout>`;
  }
});