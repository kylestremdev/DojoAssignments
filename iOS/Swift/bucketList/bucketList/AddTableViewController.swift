//
//  AddViewController.swift
//  bucketList
//
//  Created by Kyle Strem on 4/10/17.
//  Copyright © 2017 Kyle Strem. All rights reserved.
//

import UIKit

class AddTableViewController: UITableViewController {
  @IBOutlet weak var bucketListAddTextField: UITextField!
  
  var bucketListItem: String?
  var bucketListItemIndexPath: IndexPath?
  
  var cancelButtonDelegate: CancelButtonDelegate?
  var saveButtonDelegate: SaveButtonDelegate?
  
  @IBAction func cancelButtonPressed(_ sender: UIBarButtonItem) {
    cancelButtonDelegate?.cancelButtonPressed(by: self)
  }
  
  @IBAction func saveButtonPressed(_ sender: UIBarButtonItem) {
    let text = bucketListAddTextField.text!
    
    if text.characters.count > 0 {
      saveButtonDelegate?.saveButtonPressed(by: self, data: text, at: bucketListItemIndexPath)
    } else {
      cancelButtonDelegate?.cancelButtonPressed(by: self)
    }
  }

  override func viewDidLoad() {
    super.viewDidLoad()
    if bucketListItem != nil {
      bucketListAddTextField.text = bucketListItem!
    }
    // Do any additional setup after loading the view.
  }

  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
    // Dispose of any resources that can be recreated.
  }

}
