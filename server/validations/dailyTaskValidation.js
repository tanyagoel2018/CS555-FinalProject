import yup from 'yup';

const dailyTaskScema = yup.object({
    id: yup.string().required().min(1),
});

export {dailyTaskScema};