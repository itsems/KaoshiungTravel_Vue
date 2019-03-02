var app = new Vue({
    el: '#app',
    data: {
        message: 'Emma',
        data: [],
        currentPage: 0,
        locationList: [],
        currentZone: '',
    },
    methods: {
        getUniqueList() {
            const locations = new Set(); // 陣列內容不得重複
            const vm = this;
            vm.data.forEach((item, i)=> {
                locations.add(item.Zone)
            })
            console.log(locations);
            vm.locationList = Array.from(locations);
        }
    },
    computed: {
        // Filter Pagination
        filterData() {
            const vm = this;

            // filter the visible zone first, 
            // then do the pagination
            let items = [];
            if(vm.currentZone !== ''){
                // user select the select
                items = vm.data.filter((item, i)=> {
                    // console.log(item);
                    return item.Zone == vm.currentZone // 回傳為true的值丟進items
                })

            }else{
                items = vm.data;
            }

            // how many pages ?
            // contents of each page ? 
            // imagine the array should be: newData = [[1..],[2..],[3..]]
            const newData = []
            items.forEach((item, i) => {
                if (i % 10 === 0){
                    newData.push([])
                }
                const page = parseInt(i / 10)
                newData[page].push(item)
            });
            // console.log(newData);
            return newData;
      }  
    },
    created() {
        const vm = this;
        axios.get('https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97')
            .then(function (response) {
                // handle success
                // console.log(response);
                vm.data = response.data.result.records;
                // console.log(vm.data);
                vm.getUniqueList()
            })
            .catch(function (error) {
                // handle error
                console.log('抓取API失敗');
              })

    },
    
})