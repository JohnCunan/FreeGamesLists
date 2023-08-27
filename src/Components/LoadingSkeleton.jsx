import Skeleton from '@mui/material/Skeleton';

export default function LoadingSkeleton() {
    return (
        <div>
            <Skeleton 
                animation='wave' 
                variant='rectangular' 
                width={365} 
                height={206} 
                // sx={{ bgcolor: 'grey.700' }}
                />
        </div>
    )
}