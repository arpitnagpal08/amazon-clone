$(function(){
    $("#search").keyup(function(){
        var search_item = $(this).val();

        $.ajax({
            type: "POST",
            url: "/api/search",
            data: {
                search_item
            },
            dataType: "json",
            success: function(json){
                var data = json.hits.hits.map(function(res){
                    return res
                })
                $("#searchResults").empty()
                for(key in data){
                    var html = `
                            <div class="col-md-4 mt-4">
                            <div class="card box-shadow m-auto">
                                <img class="card-img-top" src="${data[key]._source.image}" alt="${data[key]._source.name}">
                                <div class="card-body">
                                    <h3>
                                        ${data[key]._source.name}
                                    </h3>
                                    <p class="card-text">${data[key]._source.category.name}</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="btn-group">
                                            <a href="/product/${data[key]._source._id}" class="btn btn-sm btn-outline-secondary">View</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                    $("#searchResults").append(html)
                }
            },
            error: function(error){
                console.log(error)
            }
        })

    });
});