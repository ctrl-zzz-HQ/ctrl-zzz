import members from '../data/members.json';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Member({ index }) {

  const getMember = function(index) {
    if (index < 0) {
      return null;
    }
    return members[index];
  }

  const [member,] = useState(getMember(index));
  const navigate = useNavigate();

  useEffect(() => {
    if (index < 0) navigate(`${Math.floor(Math.random() * members.length)}`);
  }, [index, navigate]);

  return (
    member &&
    <>
      <h2>
        MEMBER {member.code} [
        <span className="desktop">alias: </span>
        {member.alias}]
      </h2>
    </>
  );
}
