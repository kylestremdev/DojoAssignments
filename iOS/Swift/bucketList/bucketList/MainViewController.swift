//
//  ViewController.swift
//  bucketList
//
//  Created by Kyle Strem on 4/10/17.
//  Copyright © 2017 Kyle Strem. All rights reserved.
//

import UIKit

class MainViewController: UIViewController, UITableViewDataSource, UITableViewDelegate, CancelButtonDelegate, SaveButtonDelegate {
  @IBOutlet weak var bucketListTableView: UITableView!
  
  
  var bucketList: [String] = [
    "Go to the moon",
    "Eat a candy bar",
    "Ride a bike"
  ]

  override func viewDidLoad() {
    super.viewDidLoad()
    // Do any additional setup after loading the view, typically from a nib.
  }

  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
    // Dispose of any resources that can be recreated.
  }
  
  func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return bucketList.count
  }
  
  func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: "bucketListItemCell", for: indexPath)
    
    cell.textLabel?.text = bucketList[indexPath.row]
    
    return cell
  }
  
  func tableView(_ tableView: UITableView, accessoryButtonTappedForRowWith indexPath: IndexPath) {
    performSegue(withIdentifier: "segue", sender: indexPath)
  }
  
  func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
    bucketList.remove(at: indexPath.row)
    
    bucketListTableView.reloadData()
  }
  
  @IBAction func addButtonPressed(_ sender: UIBarButtonItem) {
    performSegue(withIdentifier: "segue", sender: sender)
  }
  
  override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
    let navigationController = segue.destination as! UINavigationController
    let addTableViewController = navigationController.topViewController as! AddTableViewController
    addTableViewController.cancelButtonDelegate = self
    addTableViewController.saveButtonDelegate = self
    
    if sender is NSIndexPath {
      let indexPath = sender as! IndexPath
      addTableViewController.bucketListItem = bucketList[indexPath.row]
      addTableViewController.bucketListItemIndexPath = indexPath
    }
  }
  
  func cancelButtonPressed(by controller: UIViewController) {
    dismiss(animated: true, completion: nil)
  }
  
  func saveButtonPressed(by controller: UIViewController, data: String, at indexPath: IndexPath?) {
    if let ip = indexPath {
      bucketList[ip.row] = data
    } else {
      bucketList.append(data)
    }
    
    bucketListTableView.reloadData()
    
    dismiss(animated: true, completion: nil)
  }

}

