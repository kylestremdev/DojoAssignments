//
//  SaveButtonDelegate.swift
//  bucketList
//
//  Created by Kyle Strem on 4/10/17.
//  Copyright © 2017 Kyle Strem. All rights reserved.
//

import UIKit

protocol SaveButtonDelegate {
  func saveButtonPressed(by controller: UIViewController, data: String, at indexPath: IndexPath?)
}
