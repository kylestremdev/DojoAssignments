//
//  ViewController.swift
//  rainbowRoad
//
//  Created by Kyle Strem on 4/10/17.
//  Copyright © 2017 Kyle Strem. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
  @IBOutlet weak var tableView: UITableView!
  
  let colors: [UIColor] = [
    UIColor.red,
    UIColor.orange,
    UIColor.yellow,
    UIColor.green,
    UIColor.blue,
    UIColor.purple
  ]

  override func viewDidLoad() {
    super.viewDidLoad()
    tableView.dataSource = self
    tableView.delegate = self
    // Do any additional setup after loading the view, typically from a nib.
  }

  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
    // Dispose of any resources that can be recreated.
  }


}

extension ViewController: UITableViewDataSource {
  func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return 6
  }
  
  func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: "myCell", for: indexPath)
    
//    cell.backgroundColor = UIColor(colors[indexPath.row])
    cell.contentView.backgroundColor = colors[indexPath.row]
    
    return cell
  }
}

extension ViewController: UITableViewDelegate {
  func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
    return tableView.frame.size.height / 6
  }
}

