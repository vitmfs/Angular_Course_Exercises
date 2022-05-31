import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish'; 
import { Comment } from '../shared/comment';

import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { switchMap } from 'rxjs/operators';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { baseURL } from '../shared/baseurl';

//import { trigger, state, style, animate, transition } from '@angular/animations';

import { visibility, flyInOut, expand } from '../animations/app.animation';

// const DISH = {
//   id: '0',
//   name: 'Uthappizza',
//   image: '/assets/images/uthappizza.png',
//   category: 'mains',
//   featured: true,
//   label: 'Hot',
//   price: '4.99',
//   // tslint:disable-next-line:max-line-length
//   description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
//   comments: [
//        {
//            rating: 5,
//            comment: 'Imagine all the eatables, living in conFusion!',
//            author: 'John Lemon',
//            date: '2012-10-16T17:57:28.556094Z'
//        },
//        {
//            rating: 4,
//            comment: 'Sends anyone to heaven, I wish I could get my mother-in-law to eat it!',
//            author: 'Paul McVites',
//            date: '2014-09-05T17:57:28.556094Z'
//        },
//        {
//            rating: 3,
//            comment: 'Eat it, just eat it!',
//            author: 'Michael Jaikishan',
//            date: '2015-02-13T17:57:28.556094Z'
//        },
//        {
//            rating: 4,
//            comment: 'Ultimate, Reaching for the stars!',
//            author: 'Ringo Starry',
//            date: '2013-12-02T17:57:28.556094Z'
//        },
//        {
//            rating: 2,
//            comment: 'It\'s your birthday, we\'re gonna party!',
//            author: '25 Cent',
//            date: '2011-12-02T17:57:28.556094Z'
//        }
//    ]
// };

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {

  //dish = DISH;
  //@Input()
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;

  // ADDED
  feedbackForm: FormGroup;
  feedback: Feedback;

  ratingStartingValue: number;

  presentValueOfTheRating: number | any;

  baseURLOfImage = baseURL;

  errMess: string = "";

  @ViewChild('fform') feedbackFormDirective;

  formErrors = {
    'name': '',
    // 'rating': '',
    'comment': ''
  };

  validationMessages = {
    'name': {
      'required':      'Author Name is required.',
      'minlength':     'Author Name must be at least 2 characters long.'
    },
    // 'rating': {
    //   'required':      'Last Name is required.'
    // },
    'comment': {
      'required':      'Comment is required.'
    }
  };

  dishcopy: Dish;

  visibility = 'shown';

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) { 
    this.dish = {

        id:             "",
        name:           "",
        image:          "",
        category:       "",
        featured:       false,
        label:          "",
        price:          "",
        description:    "",
        comments:       []
    
    };
    this.dishIds  = [];
    this.prev     = "";
    this.next     = "";

    this.ratingStartingValue = 5;
    this.presentValueOfTheRating = this.ratingStartingValue;



    // ADDED
    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)] ],
      //rating: ['', [Validators.required ] ],
      comment: ['', [Validators.required ] ]

    });

    this.feedback = this.feedbackForm.value;

    this.createNewCommentForm();

    this.dishcopy = {

      id:             "",
      name:           "",
      image:          "",
      category:       "",
      featured:       false,
      label:          "",
      price:          "",
      description:    "",
      comments:       []
  
  };

  } // END OF CONSTRUCTOR

  ngOnInit() {
    //const id = this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])));
    //const id = this.route.snapshot.params['id'];
    /*this.dish = */ //this.dishservice.getDish(id).then( dish => this.dish = dish);
    //this.dishservice.getDish(id.toString()).subscribe(dish => this.dish = dish);
    this.dishservice.getDishIds()
      .subscribe((dishIds) => this.dishIds = dishIds,
      errmess => this.errMess = <any>errmess);

    // this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    // .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
    // errmess => this.errMess = <any>errmess);

    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(params['id']); }))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
    errmess => this.errMess = <any>errmess);


    
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createNewCommentForm() : void {

    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)] ],
      //rating: ['', [Validators.required ] ],
      comment: ['', [Validators.required ] ]
    }); 

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {

    this.feedback = this.feedbackForm.value;
    console.log("Feedback:")
    console.log(this.feedback);
    console.log("FeedbackForm:")
    console.log(this.feedbackForm);

    // CREATE NEW COMMENT WITH THE VALUES OBTAINED
    const newComment: Comment = {
      rating: this.presentValueOfTheRating,
      comment: this.feedbackForm.value.comment,
      author: this.feedbackForm.value.name,
      date: new Date().toISOString()
    };
    console.log(newComment);

    // INSERT NEW COMMENT IN THE DISH COMMENTS ARRAY
    this.dish.comments.push(newComment);

    // INSERT COMMENTS IN THE DISH COPY AND PUT TO THE SERVER
    this.dishcopy.comments.push(newComment);
    this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => { this.dish = this.dish; this.dishcopy = this.dish; this.errMess = <any>errmess; });

    // RESTART FORM
    this.feedbackForm.reset({
      name: '',
      rating: this.ratingStartingValue,
      comment: ''
    });
    this.feedbackFormDirective.resetForm();
    


  }

}
