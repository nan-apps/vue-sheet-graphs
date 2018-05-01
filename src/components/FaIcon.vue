<template>
	<i :class="'fa fa-'+iconName"></i>
</template>

<script>

    export default {
    	name: 'FaIcon',
    	props: ['iconName']
    }

</script>