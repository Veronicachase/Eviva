import { motion } from 'framer-motion';
import { getCycleColor } from './CycleList';


export const CycleBar = ({ color }) => {
    return (
      <div className="progress-bar">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '70%' }}
          transition={{ duration: 1 }}
          style={{
            height: '10px',
            backgroundColor: color,
          }}
        />
      </div>
    );
  };
