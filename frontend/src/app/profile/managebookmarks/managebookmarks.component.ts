import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/service/profile.service';
import { Question } from 'src/app/model/question';
import { ForumService } from 'src/app/service/forum.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-managebookmarks',
  templateUrl: './managebookmarks.component.html',
  styleUrls: ['./managebookmarks.component.css'],
})
export class ManagebookmarksComponent {
  question: any[] = [];
  Question: Question = {
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
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  add(event: MatChipInputEvent): void {
  const value = (event.value || '').trim();
  // Clear the input value
  event.chipInput!.clear();
  
  }
  public allBookmarks: any[] = [];
  public hasMore: boolean = false;
  public bookmarkget: any[] = [];
  public submited: boolean = false;
  public questionsget: any[] = [];
  public userId = localStorage.getItem('userId');
  
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private profileservices: ProfileService,
    private forum: ForumService,
    private ngxLoader: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.ngxLoader.start();
    console.log(this.question);
    this.getmanageBookmarkById(this.userId);
    this.getBookmarkByUserId();
  }

  queClick(questionId: any) {
    this.router.navigate(['queanspage', questionId]);
  }

  getBookmarkByUserId() {
    this.forum.getBookmarkByUserId(this.userId).subscribe({
      next: (res) => {
       this.allBookmarks = res.data;
      },
      error: (err) => {
        console.log('Error while sending the data ' + err);
      },
    });
  }

  getmanageBookmarkById(userId: any) {
    this.profileservices.getmanageBookmarkById(userId).subscribe(
      (res: any) => {
        this.question = res.data;
        this.ngxLoader.stop();
      },
      (err) => {
        console.log(err);
        this.ngxLoader.stop();
      }
    );
  }

  // bookmarks
  removeBookmark(userId: any, questionId: any) {
    this.forum
      .addRemoveBookmark({
        userId: userId,
        questionId: questionId,
      })
      .subscribe({
        next: (res) => {
          this.allBookmarks.push(res);
          this.getBookmarkByUserId();
          this.getmanageBookmarkById(this.userId);
        
        },
        error: (err) => {
          console.log('Error while sending the data ' + err);
        },
      });
  }

  toggleBookmark(questionId: any) {
    this.isBookmarked(questionId);
    this.removeBookmark(this.userId, questionId);
  }

  isBookmarked(questionId: any) {
    return this.allBookmarks?.some(
      (bookmark) => bookmark.questionId === questionId
    );
  }

  getQuestion() {
    this.forum.getQuestions().subscribe({
      next: (res) => {
        this.questionsget = res.data;
        this.getAnswerById();
      },
      error: (err) => {
        alert('Error while fetching the data');
      },
    });
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
