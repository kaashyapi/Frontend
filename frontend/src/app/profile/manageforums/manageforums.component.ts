import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ProfileService } from 'src/app/service/profile.service';
import { Question } from 'src/app/model/question';
import { ForumService } from 'src/app/service/forum.service';
import { DeleteForumDialogComponent } from './delete-forum-dialog/delete-forum-dialog.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manageforums',
  templateUrl: './manageforums.component.html',
  styleUrls: ['./manageforums.component.css'],
})
export class ManageforumsComponent {
  question: any[] = [];
  quebyid: Question = {
    _id: '',
    userId: {
      firstName: '',
      lastName: '',
    },
    answer: {
      answer: '',
    },
    question: '',
    questionDescribe: '',
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  public Editor = ClassicEditor;
  public bookmarkget: any[] = [];
  public submited: boolean = false;
  public questionsget: any[] = [];
  public userId = localStorage.getItem('userId');

  constructor(
    public dialog: MatDialog,
    private profileservices: ProfileService,
    private forum: ForumService,
    private router: Router,
    private ngxLoader: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.ngxLoader.start();
    const id: any = localStorage.getItem('userId');
    this.profileservices.getForumsById(id).subscribe(
      (response: any) => {
        this.question = response.data;
        this.ngxLoader.stop();
      },
      (err) => {
        console.log(err);
        this.ngxLoader.stop();
      }
    );
  }

  getQuestion() {
    this.forum.getQuestions().subscribe({
      next: (res) => {
        this.questionsget = res.data;
        this.getAnswerById();
        console.log('test test', this.questionsget);
      },
      error: (err) => {
        alert('Error while fetching the data');
      },
    });
  }

  deleteForumDialog(_id: any): void {
    const dialogRef = this.dialog.open(DeleteForumDialogComponent, {
      width: 'auto',
      data: _id,
      disableClose: true,
    });
  }
    queClick(questionId: any) {
    this.router.navigate(['queanspage', questionId]);
  }

  getAnswerById() {
    for (const question of this.questionsget) {
      this.forum.getAnswerById(question._id).subscribe((res: any) => {
        question.answer =
          res.data[0] === undefined ? { answer: '' } : res.data[0];
      });
    }
  }

}
