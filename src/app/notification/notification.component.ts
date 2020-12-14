import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

notificationJSON = [
  {id:1,
  data:'Notification screen',
 
},
{id:2,
  data:'Notification setting'
},
{id:3,
  data:'Saved Search Alert'
},
{id:4,
  data:'Price drop '
},
{id:5,
  data:'Similar deals'
},
{id:6,
  data:'Listing removed'
},
{id:7,
  data:'Listing Favorited '
},
{id:8,
  data:'New review'
}
]
  getData: { id: number; data: string; }[];

  constructor() { }

  ngOnInit(): void {
  }
  passData(id){

      console.log(id)
      this.getData = this.notificationJSON.filter(ele=>ele.id === id)
        console.log(this.getData)
  }
}
