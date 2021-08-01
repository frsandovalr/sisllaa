import {Component,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent  implements OnInit {
  
  dropdownList: any;
  dropdownListData: any;
  dropdownSettings: any;
  public form!: FormGroup ;
  
  constructor(private formBuilder : FormBuilder){}

  ngOnInit(){
    this.initForm();
    this.dropdownList = this.getData();
    this.dropdownListData = this.setData();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All'
    };
    console.log(this.dropdownListData);
    this.setDefaultSelection();
    
  }

  initForm(){
    this.form = this.formBuilder.group({
      grocery : ['',[Validators.required]]
    })
  }

  handleButtonClick(){
    console.log('reactive form value ', this.form.value);
    console.log('Actual data ', this.getObjectListFromData(this.form.value.grocery.map((item: { item_id: any; }) => item.item_id)));
  }

  onItemSelect($event: any){
    console.log('$event is ', $event); 
  }

  getObjectListFromData(ids: string | any[]){
    return this.getData().filter(item => ids.includes(item.item_id))
  }

  getData() : Array<any>{
    return [
      { item_id: 1, item_text: 'Apple', group : 'F' },
      { item_id: 2, item_text: 'Orange', group : 'F' },
      { item_id: 3, item_text: 'Potatoes', group : 'V' },
      { item_id: 4, item_text: 'Cabbage', group : 'V' },
      { item_id: 5, item_text: 'Cauliflower', group : 'V' }
    ];
  }

  setData() : Array<any>{
    return [
      { item_id: 1, item_text: 'Apple', group : 'F' },
      { item_id: 2, item_text: 'Orange', group : 'F' }
    ];
  }

  setDefaultSelection(){
    //let item = this.setData()[0];
    
    this.form.patchValue({
      grocery : this.setData()
  //    [{ item_id: 1, item_text: 'Apple', group : 'F' },
  //      { item_id: 2, item_text: 'Orange', group : 'F' }
  //    ]  
    })
    
    

    
  }

   
  

}
