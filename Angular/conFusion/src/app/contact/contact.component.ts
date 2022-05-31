// IMPORTS
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

import { flyInOut, expand } from '../animations/app.animation';

import { FeedbackService } from '../services/feedback.service';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



// CLASS
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {

  // ATRIBUTES
  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;

  @ViewChild('fform') feedbackFormDirective;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  errMess: string = "";

  postFeedbackWasSuccessful: boolean = false;

  requestInProgress: boolean = false;

  awaitTimeCompleted: boolean = true;

  @ViewChild("feedback_form")
  feedback_form_el_ref!: ElementRef;

  constructor(private fb: FormBuilder, 
    private feedbackService: FeedbackService) {

    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    // this.feedbackForm = this.fb.group({
    //   firstname: '',
    //   lastname: '',
    //   telnum: 0,
    //   email: '',
    //   agree: false,
    //   contacttype: 'None',
    //   message: ''
    // });


    this.feedback = this.feedbackForm.value;
    
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });
    // this.feedbackForm = this.fb.group({
    //   firstname: ['', Validators.required ],
    //   lastname: ['', Validators.required ],
    //   telnum: ['', Validators.required ],
    //   email: ['', Validators.required ],
    //   agree: false,
    //   contacttype: 'None',
    //   message: ''
    // });

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
    console.log(this.feedback);

 
    // SAVE FEEDBACK STATE BEFORE POST
    const originalFeedback: Feedback = this.feedback;


    // SEND FEEDBACK TO SERVER
    this.requestInProgress = true;
    this.feedbackService.submitFeedback(this.feedback)
    .subscribe(feedback => {
      this.feedback = feedback;
    },
    errmess => { this.feedback = this.feedback; this.errMess = <any>errmess; });

    // WAIT A 5 SECONDS
    this.awaitTimeCompleted = false;
    setTimeout(() => {}, 5000);
    this.awaitTimeCompleted = true;
    // CHECK IF POST WAS SUCCESSFUL BY COMPARING FEEDBACKS BEFORE AND AFTER POST TO SERVER
    this.postFeedbackWasSuccessful = (originalFeedback === this.feedback);
    if( this.postFeedbackWasSuccessful ) {
      this.requestInProgress = false;
    }

    // RESET FEEDBACK FORM
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }

  setSpinnerClasses() {
    return {
      disappear: !this.postFeedbackWasSuccessful || !this.requestInProgress,
      appear: this.requestInProgress
    }
  }


  

}

// this.dishservice.putDish(this.dishcopy)
//       .subscribe(dish => {
//         this.dish = dish; this.dishcopy = dish;
//       },
//       errmess => { this.dish = this.dish; this.dishcopy = this.dish; this.errMess = <any>errmess; });
