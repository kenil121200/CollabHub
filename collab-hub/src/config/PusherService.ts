// Author: Jay Patel

import Pusher from "pusher-js";

const pusher = new Pusher("0ad0b6a34adab474cc3c", {
  cluster: "us2",
});

export default pusher;
