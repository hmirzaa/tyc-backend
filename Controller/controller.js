const country = require("country-state-city").Country;
const firebase = require("firebase-messaging");
const profileSchema = require("../Model/profile");
const requirementSchema = require("../Model/requirement");
const releaseSchema = require("../Model/release");
const tracking = require("../Model/tracking");
const payment = require("../Model/payment");
const request = require("../Model/request");
const issue = require("../Model/issue");
const admin = require("../Model/admin");
const container = require("../Model/container");
const release = require("../Model/release");
const contact = require("../Model/contact");

exports.newProfile = async (req, res) => {
  let profile = new profileSchema({...req.body,date:new Date()});
  await profile.save((fail, pass) => {
    if (fail) {
      res.status(500).send(fail);
    } else {
      res.status(201).json({ message: "Profile Created" });
    }
  });
};

exports.listProfile = async (req, res) => {
  profileSchema.find({}, (fail, pass) => {
    if (fail) {
      res.status(500).send(fail);
    } else {
      res.status(200).json(pass);
    }
  });
};

exports.deleteProfile = async (req, res) => {
  await profileSchema
    .findByIdAndRemove(req.params.id)
    .exec((err, deleteItem) => {
      if (err) {
        res.send(err);
      }
      return res.json({ message: "Profile Deleted" });
    });
};

exports.updateProfile = async (req, res) => {
  profileSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, post) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json({ message: "Profile Updated" });
      }
    }
  );
};

exports.newRequirement = async (req, res) => {
  let abc = await profileSchema.findById(req.body._id);
  let requireId = await requirementSchema.countDocuments();
  let ref = new requirementSchema({
    firstName: abc.firstName,
    lastName: abc.lastName,
    companyLogo: abc.companyLogo,
    firebaseId: abc.firebaseId,
    userType: req.body.userType,
    pickLocation: req.body.pickLocation,
    dropLocation: req.body.dropLocation,
    direction: req.body.direction,
    validation: req.body.validation,
    equipmentType: req.body.equipmentType,
    tradeType: req.body.tradeType,
    size: req.body.size,
    type: req.body.type,
    containerCondition: req.body.containerCondition,
    equipmentCount: req.body.equipmentCount,
    requirementId: requireId,
    usesCount: req.body.usesCount,
    date:req.body.date,
  });
  await ref.save((fail, pass) => {
    if (fail) {
      res.status(500).send(fail);
    }
    return requirementSchema.find(
      { firebaseId: abc.firebaseId },
      (fail, pass) => {
        if (fail) {
          res.status(500).send(fail);
        } else {
          let filterData = pass.filter((item) => item.visibility === true);
          res.status(200).json(filterData);
        }
      }
    );
  });
};

exports.requirementViews = async (req, res) => {
  // let abc = await profileSchema.findById({ _id: req.body._id });

  let ref = await requirementSchema.findOne({ _id: req.body._id });
  ref.views += 1;
  await ref.save((fail, pass) => {
    if (fail) {
      res.status(500).send(fail);
    } else {
      console.log("profile==>", ref);
      res.status(201).json({ message: "Requirement Send" });
    }
  });
};

exports.listRequirement = async (req, res) => {
  requirementSchema.aggregate([{
    $addFields: {
        reqId: {
            "$toString": "$_id"
        }
    }
    }, {
        $lookup: {
            from: 'requests',
            localField: 'reqId',
            foreignField: 'requirementId',
            as: 'relatedRequests'
        }
    }, {
        $addFields: {
            requestsCount: {
                $size: "$relatedRequests"
            }
        }
    }]).then( data=>{
      res.status(200).json(data);
    }).catch(err => {
        res.status(500).send({ 
          message: err.message 
        });
    });
};
exports.updateRequirement = async (req, res) => {
  let data = await requirementSchema.findOne({ _id: req.params.id });
  requirementSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, post) => {
      if (err) {
        res.status(400).json(err);
      }
      return requirementSchema.find(
        { firebaseId: data.firebaseId },
        (fail, pass) => {
          if (fail) {
            res.status(500).send(fail);
          } else {
            res.status(200).json(pass);
          }
        }
      );
    }
  );
};
exports.updateRequest = async (req, res) => {
  request.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, post) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json({ message: "Request Updated" });
      }
    }
  );
};

// exports.deleteRequirement = async (req, res) => {
//   let id = await requirementSchema.findOne({ _id: req.params.id });
//   requirementSchema.findByIdAndRemove(req.params.id).exec((err, deleteItem) => {
//     if (err) {
//       res.send(err);
//     }
//     return requirementSchema.find(
//       { firebaseId: id.firebaseId },
//       (fail, pass) => {
//         if (fail) {
//           res.status(500).send(fail);
//         } else {
//           res.status(200).json(pass);
//         }
//       }
//     );
//   });
// };

exports.deleteRequirement = async (req, res) => {
  requirementSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: { visibility: false },
    },
    (err, post) => {
      if (err) {
        res.status(400).json(err);
      } else {
        request.updateMany(
          { requirementById: req.params.id },
          {
            $set: { visibility: false },
          },
          (err, post) => {
            if (err) {
              res.status(400).json(err);
            }
          }
        );
        res.status(200).json({ message: "Deleted" });
      }
    }
  );
};

exports.requirementById = async (req, res) => {
  requirementSchema.findById(req.params.id, (fail, pass) => {
    if (fail) {
      res.status(500).send(fail);
    } else {
      if (pass.visibility === true) res.status(200).json(pass);
      else {
        res.status(200).json({ message: "No Requirement Available" });
      }
    }
  });
};
exports.requestById = async (req, res) => {
  await request.findById(req.params.id).exec((fail, pass) => {
    if (fail) {
      res.status(500).send(fail);
      console.log(fail);
    } else {
      res.status(200).json(pass);
    }
  });
};
exports.requirementByUserId = async (req, res) => {
  requirementSchema.aggregate([{
    $addFields: {
        userId: {
            "$toString": "$_id"
        }
    }
    },{
      $match: {
          firebaseId: req.body.firebaseId
      }
    }, {
        $lookup: {
            from: 'requests',
            localField: 'userId',
            foreignField: 'requirementId',
            as: 'relatedRequests'
        }
    }, {
        $addFields: {
            requestsCount: {
                $size: "$relatedRequests"
            }
        }
    }]).then( data=>{
      let pass = data.filter(item=>item.visibility===true)
      res.status(200).json(pass);
    }).catch(err => {
        res.status(500).send({ 
          message: err.message 
        });
    });
};
exports.paymentByUserId = async (req, res) => {
  try {
    await payment
      .find({ recieverId: req.body.recieverId })
      .exec((fail, pass) => {
        if (fail) {
          res.status(500).send(fail);
          console.log(fail);
        } else {
          res.status(200).json(pass);
        }
      });
  } catch (error) {
    console.log("err");
    res.json({ message: err });
  }
};
exports.trackingrequirement = async (req, res) => {
  let requesting = await request.findOne({
    _id: req.body._id,
  });
  let requirementData = await requirementSchema.findOne({
    _id: requesting.requirementId,
  });

  // console.log(requesting);
  let track = new tracking({
    ...req.body,
    requestId: requesting.requestId,
    requestType: requesting.requestType,
    requestStatus: requesting.requestStatus,
    paymentStatus: requesting.paymentStatus,
    userId: requesting.userId,
    equipmentCount: requirementData.equipmentCount,
  });
  console.log(track);
  await track.save((fail, pass) => {
    if (fail) {
      // console.log(fail);
      res.status(500).send(fail);
    } else {
      // console.log(pass);
      res.status(201).json(pass);
    }
  });
};

exports.updateTracking = async (req, res) => {
  tracking.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    },
    (err, post) => {
      if (err) {
        res.status(400).json(err);
      }
      tracking.find({}, (fail, pass) => {
        if (fail) {
          res.status(500).send(fail);
        } else {
          res.status(200).json(pass);
        }
      });
    }
  );
};

exports.findRequest = async (req, res) => {
  try {
    let value1 = await request.findOne({ _id: req.body.requestId });
    var data = {
      reciverId: value1.recieverId,
      userId: value1.userId,
    };
    let sender = await profileSchema.findOne({ _id: data.userId });
    let reciever = await profileSchema.findOne({
      firebaseId: data.reciverId,
    });
    console.log(data);
    res.json({ sender, reciever });
  } catch (error) {
    res.json(error);
  }
};

// exports.getUser = async (req, res) => {
//   try {
//     let value = await profileSchema.findOne({ _id: req.body.userId });
//     let value2 = await profileSchema.findOne({
//       firebaseId: req.body.recieverId,
//     });
//     var data = { value, value2 };
//     res.json(data);
//   } catch (error) {
//     res.json(error);
//   }
// };

// exports.getByFirebaseId = async (req, res) => {
//   try {
//     let value = await profileSchema.findOne({
//       firebaseId: req.body.recieverId,
//     });
//     var data = value;
//     res.json(data);
//   } catch (error) {
//     res.json(error);
//   }
// };

exports.listTracking = async (req, res) => {
  tracking.find({}, (fail, pass) => {
    if (fail) {
      res.status(500).send(fail);
    } else {
      res.status(200).json(pass);
    }
  });
};

exports.payment = async (req, res) => {
  let pay = new payment(req.body);
  await pay.save((fail, pass) => {
    if (fail) {
      res.status(500).send(fail);
    } else {
      res.status(201).json({ message: "Payment Posted" });
    }
  });
};

exports.listPayment = async (req, res) => {
  payment.find({}, (fail, pass) => {
    if (fail) {
      res.status(500).send(fail);
    } else {
      res.status(200).json(pass);
    }
  });
};

exports.newrequest = async (req, res) => {
  try {
    let requirement = await requirementSchema.findOne({
      _id: req.body.requirementId,
    });
    let updateRequirement = await requirementSchema.findOneAndUpdate(
      {
        _id: req.body.requirementId,
      },
      {
        requests: [...requirement.requests, req.body.userId],
      }
    );
    let requestId = await request.countDocuments();
    requestId = requestId + 100000;
    let reque = new request({
      ...req.body,
      requestId,
      visibility: requirement.visibility,
      userType: requirement.userType,
      size: requirement.size,
      tradeType: requirement.tradeType,
      equipmentType: requirement.equipmentType,
    });
    console.log(req.body);
    await reque.save(() => {
      console.log(reque, "request");
      res
        .status(200)
        .json({ requestId, id: reque._id, message: "Request posted" });
    });
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
};
exports.requestByUserId = async (req, res) => {
  try {
    await request.find({ userId: req.body.userId }).exec((fail, pass) => {
      res.status(200).json(pass);
    });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

exports.requestByBody = async (req, res) => {
  try {
    const body = req.body;
    await request.find(body).exec((fail, pass) => {
      res.status(200).json(pass);
    });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

exports.trackByUserId = async (req, res) => {
  try {
    await tracking.find({ userId: req.params.id }).exec((fail, pass) => {
      res.status(200).json(pass);
    });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

exports.deleteRequest = async (req, res) => {
  try {
    await request.findByIdAndRemove(req.params.id).exec((err, deleteItem) => {
      return res.json({ message: "Request Deleted" });
    });
  } catch (error) {
    res.send(err);
  }
};
exports.deleteRelease = async (req, res) => {
  try {
    await release.findByIdAndRemove(req.params.id).exec((err, deleteItem) => {
      return res.json({ message: "Release Deleted" });
    });
  } catch (error) {
    res.send(err);
  }
};

exports.listRequest = async (req, res) => {
  try {
    request.find({}, (fail, pass) => {
      let filterData = pass.filter((item) => item.visibility === true);
      res.status(200).json(filterData);
    });
  } catch (error) {
    res.status(200).json(error);
  }
};

exports.listAllRequests = async (req, res) => {
  try {
    request.find({}, (fail, pass) => {
      res.status(200).json(pass);
    });
  } catch (error) {
    res.status(200).json(error);
  }
};

exports.approved = async (req, res) => {
  request.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, post) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json({ message: "Request approved" });
      }
    }
  );
};

exports.requestFalse = async (req, res) => {
  const aaa = await request.find({ approved: false });
  if (!aaa) {
    res.status(500).send("fail");
  } else {
    res.status(200).json(aaa);
  }
};

exports.requestTrue = async (req, res) => {
  const aaa = await request.find({ approved: true });
  if (!aaa) {
    res.status(500).send("fail");
  } else {
    res.status(200).json(aaa);
  }
};

exports.getTrackingContainerById = async (req, res) => {
  try {
    request.findOne({ requestId: req.body.requestId }, (fail, pass) => {
      return res.status(200).json(pass);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.listProfileById = async (req, res) => {
  try {
    const pro = await profileSchema.findOne({
      firebaseId: req.body.firebaseId,
    });

    console.log(pro);
    res.status(200).json(pro);
  } catch (err) {
    console.log("err");
    res.json({ message: err });
  }
};

exports.usingContainer = async (req, res) => {
  const aaa = await requirementSchema.find({ userType: true });
  if (!aaa) {
    res.status(500).send("fail");
  } else {
    res.status(200).json(aaa);
  }
};

exports.supplyContainer = async (req, res) => {
  const aaa = await requirementSchema.find({ userType: false });
  if (!aaa) {
    res.status(500).send("fail");
  } else {
    res.status(200).json(aaa);
  }
};

exports.notification = async (req, res) => {
  var client = new firebase({
    apiKey: "AIzaSyAs9MRdELyVua8fdQeDg6CaLJdwB-qv5uM",
    authDomain: "tradeyourcontainer-f9db6.firebaseapp.com",
    projectId: "tradeyourcontainer-f9db6",
    storageBucket: "tradeyourcontainer-f9db6.appspot.com",
    messagingSenderId: "702345256301",
    appId: "1:702345256301:web:d1fe6ca4ac60d8e7128e64",
  });

  var data = {
    title: "hello",
    content: "testing",
  };

  var options = {
    delay_while_idle: true,
  };

  client.topic("news", data, options, function (result) {
    // request err or message id
    console.log(result);
  });

  client.message(DEVICE_TOKEN, data);
};

exports.newIssue = async (req, res) => {
  let reque = new issue(req.body);
  try {
    await reque.save((fail, pass) => {
      // if (fail) {
      //   res.status(500).send(fail);
      // } else {
      res.status(201).json({ message: "Issue Generated" });
      // }
    });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

exports.listIssues = async (req, res) => {
  issue.find({}, (fail, pass) => {
    if (fail) {
      res.status(500).send(fail);
    } else {
      res.status(200).json(pass);
    }
  });
};

exports.newadmin = async (req, res) => {
  const { name, email, password, profileInfo } = req.body;
  try {
    let data = await admin.findOne({ email: email });
    if (data) {
      return res.status(422).send("That user already exisits!");
    } else {
      const newAdmin = await admin.create({
        name,
        email,
        password,
        profileInfo,
      });
      newAdmin.save();
      res.send("Admin Created");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.admin = async (req, res) => {
  const { email, password } = req.body;
  var token = process.env.TOKEN;
  try {
    const user = await admin.findOne({ email: email });
    if (!user) {
      return res.status(422).send("Invalid Email");
    }
    if (password === user.password) {
      res.status(200).json({
        name: user.name.toUpperCase(),
        email: user.email,
        token: token,
        info: user.profileInfo,
      });
    } else {
      res.status(422).send("Invalid Password");
    }
  } catch {
    res.status(500).send();
  }
};

exports.getAdmin = async (req, res) => {
  admin.find({}, (fail, pass) => {
    if (fail) {
      res.status(500).send(fail);
    } else {
      res.status(200).json(pass);
    }
  });
};

// exports.deleteAdmin = async (req, res) => {
//   await admin.findByIdAndRemove(req.params.id).exec((err, deleteItem) => {
//     if (err) {
//       res.send(err);
//     }
//     return res.json({ message: "Profile Deleted" });
//   });
// };

exports.newcontainer = async (req, res) => {
  try {
    let containerId = await container.countDocuments();
    containerId = containerId + 10000;
    let cont = new container({
      ...req.body,
      containerId,
    });
    console.log(req.body);
    await cont.save(() => {
      console.log(cont, "container");
      res
        .status(200)
        .json({ containerId, id: cont._id, message: "Container Created" });
    });
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
};

exports.getContainer = async (req, res) => {
  container.find({}, (fail, pass) => {
    if (fail) {
      res.status(500).send(fail);
    } else {
      res.status(200).json(pass);
    }
  });
};

exports.containerByRequestId = async (req, res) => {
  try {
    await container
      .find({ requestId: req.body.requestId })
      .exec((fail, pass) => {
        res.status(200).json(pass);
      });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

exports.updateContainer = async (req, res) => {
  container.findOneAndUpdate(
    { containerId: req.params.id },
    {
      $set: req.body,
    },
    (err, post) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json({ message: "Container Updated" });
      }
    }
  );
};

exports.newrelease = async (req, res) => {
  let data = new release(req.body);
  try {
    await data.save((fail, pass) => {
      // if (fail) {
      // } else {
      return res.status(201).json({ message: "Release Created" });
      // }
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getRelease = async (req, res) => {
  try {
    await release.find({ requestId: req.params.id }).exec((fail, pass) => {
      res.status(200).json(pass);
    });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

exports.dropRelease = async (req, res) => {
  release.drop({}, (fail, pass) => {
    if (fail) {
      res.status(500).send(fail);
    } else {
      res.status(200).json({ message: "Database Wipped!" });
    }
  });
};

exports.gather = async (req, res) => {
  try {
    let totalReq = await requirementSchema.find({
      firebaseId: req.params.id,
    });
    let approveReq = await request.find({
      $and: [
        {
          senderId: req.params.id,
        },
        {
          approved: true,
        },
      ],
    });
    let notApproveReq = await request.find({
      $and: [
        {
          senderId: req.params.id,
        },
        {
          approved: false,
        },
      ],
    });
    // console.log(approveReq.length);
    res.status(200).json({
      totalReq: totalReq.length,
      appReq: approveReq.length,
      notappReq: notApproveReq.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.newContact = async (req, res) => {
  let reque = new contact(req.body);
  try {
    await reque.save((fail, pass) => {
      // if (fail) {
      // } else {
      return res.status(201).json({ message: "Contact Created" });
      // }
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getContact = async (req, res) => {
  contact.find({}, (fail, pass) => {
    if (fail) {
      res.status(500).send(fail);
    } else {
      res.status(200).json(pass);
    }
  });
};

//   // releaseSchema.find({},(fail, pass) => {
//   //   if (fail) {
//   //     res.status(500).send(fail);
//   //     console.log(fail);
//   //   } else {
//   //     res.status(200).json(pass);
//   //   }
//   // });
//   try {
//     await release
//       .findOne({ requestId: req.body.requestId })
//       .exec((fail, pass) => {
//         if (fail) {
//           res.status(500).send(fail);
//           console.log(fail);
//         } else {
//           res.status(200).json(pass);
//         }
//       });
//   } catch (error) {
//     console.log("err");
//     res.json({ message: err });
//   }
// };
