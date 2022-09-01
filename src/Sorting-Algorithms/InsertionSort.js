let animation = [];

function InsertionSort(arr) {
    animation = [];
    for(let i=0;i<arr.length;i++){
        let key = arr[i];
        let j = i-1;
        while(j>=0 && arr[j]>key){
            [arr[j+1],arr[j]]=[arr[j],arr[j+1]]
            animation.push([j,j+1]);
            j--;
        }
    }
    return animation;
}

export default InsertionSort;