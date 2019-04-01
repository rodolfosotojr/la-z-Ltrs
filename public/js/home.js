// jQuery Login code
$(document).ready(function () {

  // get user info
  function getUserInfo() {
    $.get("/api/getuser").then(function(userdata) {
      console.log(userdata);
      $("#firstname").html(userdata.firstname);
    })
  }

  getUserInfo();

  // USER SAVED ORDERS
  function savedOrders() {
    // clear order row
    $("#save-history").empty();
    // show past orders
    $.ajax({ url: "/api/savedorders", method: "GET" })
      .then(function (savedorder) {
        savedorder.forEach(function (item) {
          // var orderDate = moment(item.createdAt, moment.ISO_8601).format("MMM DD, YYYY hh:mm a");
          var orderDate = moment(item.updatedAt).local().format("MMM DD, YYYY hh:mm a");
          url = "https://api.handwrytten.com/v1/cards/view?card_id=" + item.card_id + "&lowres=1";
          $.ajax({ url: url, method: "GET" }).then(function (handwrytten) {
            var buttonColor;
            var buttonStatus;
            if (item.order_processed === true) {
              buttonColor = "btn-secondary";
              buttonStatus = "Order Sent/<br/>Reorder?";
            } else {
              buttonColor = "btn-success";
              buttonStatus = "Submit Order";
            };
            row = `
            <tr>
              <td>${item.id}</td>
              <td>${item.sender_name}</td>
              <td>${item.recipient_name}</td>
              <td>${item.card_type}</td>
              <td><img src="${handwrytten.card.cover}" style="width: 75px; height:75px; object-fit: cover"></td>
              <td style="font-family: ${item.font}; font-size: 3em;">${item.font_label}</td>
              <td>${orderDate}</td>
              <td><a class="update btn btn-primary" data-id="${item.id}">View/Edit</a></td>
              <td><a class="delete btn btn-danger" data-id="${item.id}">Delete</a></td>
              <td><a class="submit-order edit btn ${buttonColor}" data-status="${item.order_processed}" data-id="${item.id}">${buttonStatus}</a></td>
            </tr>
            `
            $("#save-history").append($(row));

          })
        })
      })
  }

  // HANDWRYTREEN ORDERS
  function getOrders() {
    // show past orders
    $.ajax({ url: "/api/orderhistory", method: "GET" })
      .then(function (order) {
        order.orders.forEach(function (item) {
          var orderDate = moment.unix(item.date_created).format("MMM DD, YYYY hh:mm a");
          row = `
        <tr>
        <td>${item.id}</td>
        <td>${item.address_from.name}</td>
        <td>${item.address_to.name}</td>
        <td>${item.card.name}</td>
        <td><img src="${item.card.cover}" style="width: 75px; height:75px; object-fit: cover"></td>
        <td style="font-family: ${item.font}; font-size: 3em;">${item.fontInfo.label}</td>
        <td>${orderDate}</td>
        </tr>
        `
          $("#order-history").append($(row));
        })
      })
  }

  // pull data from MySql
  savedOrders();
  // pull data from Handwrytten API
  getOrders();

  // UPDATE order
  $(document).on("click", ".update", function (event) {
    event.preventDefault();
    // get ID from button's data-id then send to /api/order/:id
    var orderId = $(this).attr("data-id");
    // Load page using a query string ?orderid=orderId
    window.location.href = "/update?orderid=" + orderId;
  })

  // confirm delete modal
  $(document).on("click", "#confirm-delete-btn", function (event) {
    event.preventDefault();
    var orderId = $(this).attr("data-id");
    // FUTURE TODO - Get userId from order using AJAX call to api/order/:id
    $.ajax({
      method: "DELETE",
      url: "/api/order/" + orderId,
    })
      .then(function () {
        $('#delete-modal').modal("toggle");
        savedOrders();
      });
  })

  // show Delete Modal and pass data-id to it
  $(document).on("click", ".delete", function (event) {
    event.preventDefault();
    var orderId = $(this).attr("data-id");
    // assign orderId to Modal Confirm button
    $("#confirm-delete-btn").attr('data-id', orderId);
    // show modal
    $('#delete-modal').modal("toggle");
  })

  // submit order modal - Currently toggles order processed status
  $(document).on("click", "#submit-order-btn", function (event) {
    event.preventDefault();
    var orderId = $(this).attr("data-id");
    var orderStatus = {"order_processed": $(this).attr("data-status")};
    // FUTURE TODO - Get userId from order using AJAX call to api/order/:id
    $.ajax({
      method: "PUT",
      url: "/api/submitorder/" + orderId,
      data: orderStatus
    })
      .then(function () {
        $('#submit-modal').modal("toggle");
        savedOrders();
      });
  })

  // show Submit Order Modal and pass data-id to it
  $(document).on("click", ".submit-order", function (event) {
    event.preventDefault();
    var orderId = $(this).attr("data-id");
    var orderStatus = $(this).attr("data-status");
    // assign orderId to Modal Confirm button
    $("#submit-order-btn").attr('data-id', orderId);
    $("#submit-order-btn").attr('data-status', orderStatus);
    // show modal
    $('#submit-modal').modal("toggle");
  })

});
