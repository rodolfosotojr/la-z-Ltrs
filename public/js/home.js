// jQuery Login code
$(document).ready(function () {

  function savedOrders() {
    // show past orders
    $.ajax({ url: "/api/savedorders", method: "GET" })
      .then(function (savedorder) {
        // console.log("***************SAVED ORDER HISTORY:\n", savedorder);
        savedorder.forEach(function (item) {
          url = "https://api.handwrytten.com/v1/cards/view?card_id=" + item.card_id + "&lowres=1"
          $.ajax({ url: url, method: "GET" }).then(function (handwrytten) {
            row = `
            <tr>
              <td>${item.id}</td>
              <td>${item.sender_name}</td>
              <td>${item.recipient_name}</td>
              <td>${item.card_type}</td>
              <td><img src="${handwrytten.card.cover}" style="width: 75px; height:75px; object-fit: cover"></td>
              <td style="font-family: ${item.font}; font-size: 2em;">${item.font_label}</td>
              <td>${item.createdAt}</td>
              <td><a class="update btn btn-secondary" data-id="${item.id}">Edit</a></td>
              <td><a class="delete btn btn-danger" data-id="${item.id}">Delete</a></td>
              <td><a class="complete-order edit btn btn-warning" data-id="${item.id}">Order</a></td>
            </tr>
            `
            $("#save-history").append($(row));

          })
        })
      })
  }


  function getOrders() {
    // show past orders
    $.ajax({ url: "/api/orderhistory", method: "GET" })
      .then(function (order) {
        console.log("***************ORDER HISTORY:\n", order.orders);
        order.orders.forEach(function (item) {
          row = `
        <tr>
        <td>${item.id}</td>
        <td>${item.address_from.name}</td>
        <td>${item.address_to.name}</td>
        <td>${item.card.name}</td>
        <td><img src="${item.card.cover}" style="width: 75px; height:75px; object-fit: cover"></td>
        <td style="font-family: ${item.font}; font-size: 2em;">${item.fontInfo.label}</td>
        <td>${item.date_created}</td>
        </tr>
        `
          $("#order-history").append($(row));
        })
      })
  }

  $(document).on("click", ".update", function (event) {
    event.preventDefault();
    // get ID from button's data-id then send to /api/order/:id
    var orderId = $(this).attr("data-id");
    alert("UPDATE ORDER CALL AT /api/updateorder/" + orderId);
    // window.location.href = "/api/order/" + orderId;
  })

  $(document).on("click", ".delete", function (event) {
    event.preventDefault();
    var orderId = $(this).attr("data-id");
    alert("DELETE ORDER CALL at /api/deleteorder/" + orderId);
    // $.ajax({
    //   method: "DELETE",
    //   url: "/api/order/" + orderId,
    //   success: function(data) {
    //     window.location.reload();
    //   }
    // })
    //   .then(function () {

    //   });
  })

  $(document).on("click", ".complete-order", function (event) {
    event.preventDefault();
    var orderId = $(this).attr("data-id");
    alert("COMPLETE ORDER CALL at /api/submitorder/" + orderId);
  })

  // pull data from MySql
  savedOrders();
  // pull data from Handwrytten API
  getOrders();



});
