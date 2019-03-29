// jQuery Login code
$(document).ready(function () {
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
            <td>${item.price}</td>
            <td>${item.card.id}</td>
            <td>${item.card.quantity}</td>
          </tr>
          `
          $("#order-history").append($(row));
        })
      })
  }

  getOrders();

});
