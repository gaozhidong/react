import AV from 'leancloud-storage'

const APP_ID = 'Pq3DXIDAnJGs2ihtPbyIbHm4-gzGzoHsz';
const APP_KEY = 'M3KNWQIgQfhiAnCRHAWlxfBT';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

export default AV; 