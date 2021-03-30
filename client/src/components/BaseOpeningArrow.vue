<template>
    <svg id="arrow" :class="[open ? 'down__pointing' : '']" width="30" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="30" height="20"/>
        <g clip-path="url(#clip0)">
            <rect width="30" height="20" />
            <path id="triangle" d="M15.5328 9.18615C16.1978 9.57384 16.1938 10.5361 15.5255 10.9182L8.0075 15.2169C7.33923 15.599 6.50791 15.1144 6.51113 14.3446L6.54733 5.68447C6.55055 4.91467 7.38588 4.43703 8.05093 4.82472L15.5328 9.18615Z" fill="#C4C4C4"/>
        </g>
        <path d="M52.5 10L52.933 13H52.067L52.5 10Z"/>
    </svg>
</template>

<script>
export default {
    props:{
        open: Boolean,
    },
}
</script>

<style scoped>
    .down__pointing {
        transform: rotate(90deg);
    }
    #triangle {
        fill: red;
    }
    svg {
        cursor: pointer;
    }
</style>