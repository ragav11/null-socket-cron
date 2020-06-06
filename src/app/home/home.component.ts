import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var sailsSocket: any;


declare var $;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  auction: any = 'NOT STARTED'
  time: number;
  constructor(
    private http: HttpClient, 
  ) { 
    // $('#datetimepicker1').datetimepicker();
  }

  ngOnInit(): void {
    sailsSocket.post('http://localhost:1337/connect-socket',(connection)=>{
      console.log(connection);
    })

    sailsSocket.on('socket-cron', (data) => {
      console.log(data);
      this.auction = 'Live';
    })

  }
  startTimer(val) {
    this.time = val;
    var date = new Date();
    date.setSeconds(date.getSeconds() + val);
    this.http.post<any>('http://localhost:1337/startcron', {date}).subscribe(res => {
      var timeintervel = setInterval(()=>{
        this.time-=1
      },1000)
      console.log(res);
    })
    setInterval(() => this.time -=1, 1000);
    console.log(val);
  }

}
