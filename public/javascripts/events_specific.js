function handleParameters() {
    // Get the URL parameters
    var params = new URLSearchParams(window.location.search);

    // Retrieve the values
    var param1 = params.get('param1');
    var param2 = params.get('param2');

    // Pass the parameters to your function
    yourFunction(param1, param2);
}
