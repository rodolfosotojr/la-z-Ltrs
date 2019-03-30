// jQuery Login code
$(document).ready(function () {

  function savedOrders() {
    // show past orders
    $.ajax({ url: "/api/savedorders", method: "GET" })
      .then(function (savedorder) {
        console.log("***************SAVED ORDER HISTORY:\n", savedorder);
        savedorder.forEach(function (item) {
          row = `
          <tr>
            <td>${item.id}</td>
            <td>${item.sender_name}</td>
            <td>${item.recipient_name}</td>
            <td>${item.recipient_address1}</td>
            <td><img src="${item.recipient_address2}" style="width: 75px; height:75px; object-fit: cover"></td>
            <td>${item.recipient_city}</td>
          </tr>
          `
          $("#save-history").append($(row));
        })
      })
  }

  savedOrders();

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
            <td>${item.card.quantity}</td>
          </tr>
          `
          $("#order-history").append($(row));
        })
      })
  }

  getOrders();

});
