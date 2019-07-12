import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-maternity-summary',
  templateUrl: './maternity-summary.component.html',
  styleUrls: ['./maternity-summary.component.scss'],
})
export class MaternitySummaryComponent implements OnInit {
  conceptionForm = this.fb.group({
    status: [''],
    type: [''],
    details: this.fb.group({
      HI: ['false'],
      OS: ['false'],
      S: ['false'],
      WL: ['false']
    }),
    embryos: [''],
    dateEmbryos: ['']
  });
  segment = 0;
  @ViewChild('slides') slider: IonSlides;
  segments = [
    {
      name: 'Current Pregnancy',
      isSelected: 'false',
      isDisable: false,
    },
    {
      name: 'Social History',
      isSelected: 'false',
      isDisable: true,
    },
    {
      name: 'Substance History',
      isSelected: 'false',
      isDisable: true,
    },
    {
      name: 'Family History',
      isSelected: 'false',
      isDisable: true,
    },
    {
      name: 'Mental Wellbeing',
      isSelected: 'false',
      isDisable: true,
    },
  ];
  isConception;
  isEmbryos;
  constructor(private fb: FormBuilder) {
    console.log('Maternity Summary Init');
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.conceptionForm.value);
    this.segments[++this.segment].isDisable = false;
    this.slider.slideTo(this.segment);
  }

  checkConception(value: string) {
    this.isConception = value;
    console.log(this.isConception);
  }

  checkEmbryos(value: string) {
    this.isEmbryos = value;
    console.log(this.isEmbryos);
  }

  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }


}
