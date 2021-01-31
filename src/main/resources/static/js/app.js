
$(document).ready(function () {
 	
    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var color = Chart.helpers.color;
    
    let $canvas = $('#semaine-consomation-chart');
    let ctx = $canvas[0].getContext('2d');
    let url = `http://localhost:9080/mesures/search/findTop7ByCompteur_IdOrderByIdDesc?id=${window.location.pathname.split('/')[2]}`;
    $.getJSON(url,(data) => {
        console.log(data);
        var barChartData = {
            labels: data._embedded.mesures.map(e => e.dayName),
            datasets: [{
                label: "Consomation d'éléctricité",
                backgroundColor: color("rgb(54, 162, 235)").alpha(0.5).rgbString(),
                borderColor: "rgb(54, 162, 235)",
                borderWidth: 1,
                data: data._embedded.mesures.map(e => e.valeur.toFixed(2))
            }]
    
        };
        window.myBar = new Chart(ctx, {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Week Data'
                }
            }
        });
    });
    $('select[name="dob-month"],select[name="bar-type"],select[name="dob-year"]').on('change',() => {
        let year = $('select[name="dob-year"]').val() == '' ? 2021 : $('select[name="dob-year"]').val();
        let month = $('select[name="dob-month"]').val() == '' ? 1 : $('select[name="dob-month"]').val();
        console.log("change")
        getDataByMonthAndYear(year,month, $('select[name="bar-type"]').val(),color);
    })
    $('#nav-profile-tab').on('click', () => {
        let year = 2021, month = 1;
        getDataByMonthAndYear(2021,1,'day',color);
    })
    
});
function getDataByMonthAndYear(year,month,barType,color){
    let url = `http://localhost:9080/mesures/search/getByYearAndMonth?year=${year}&month=${month}`;
        let $canvas = $('#mensuelle-consomation-chart');
        let ctx = $canvas[0].getContext('2d');
        $.getJSON(url,(data) => {
            console.log(data);
            var barChartData = {
                labels: barType == 'day' ? data._embedded.mesures.map(e => e.dayName) : ['Week 1','Week 2','Week 3','Week 4'],
                datasets: [{
                    label: "Consomation d'éléctricité",
                    backgroundColor: color("rgb(54, 162, 235)").alpha(0.5).rgbString(),
                    borderColor: "rgb(54, 162, 235)",
                    borderWidth: 1,
                    data: barType == 'day' ? data._embedded.mesures.map(e => e.valeur.toFixed(2)) : [700,350,210,12]
                }]
        
            };
            window.myBar = new Chart(ctx, {
                type: 'bar',
                data: barChartData,
                options: {
                    responsive: true,
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Month Data'
                    }
                }
            });
        });
}