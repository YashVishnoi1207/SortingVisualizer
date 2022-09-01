let animation = [];

function SelectionSort(arr){
    animation = [];
    var i, j, min_idx;
    for(i=0;i<arr.length-1;i++){
        min_idx = i;
        for(j=i+1;j<arr.length;j++){
            if(arr[j]<arr[min_idx]){
                min_idx = j;
            }
        }
        [arr[i],arr[min_idx]] = [arr[min_idx],arr[i]]; 
        animation.push([i,min_idx]);
    }
    return animation;
}

export default SelectionSort;