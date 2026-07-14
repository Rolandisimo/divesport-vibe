import type { TeamMember } from '@/types/content';

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="team__card">
      <div className="team__photo" style={{ backgroundImage: `url('${member.photoUrl}')` }} />
      <div className="team__body">
        <h3>{member.name}</h3>
        {member.certs.map((cert) => (
          <p className="team__cert" key={cert}>
            {cert}
          </p>
        ))}
        <blockquote>{member.quote}</blockquote>
        {member.extra && (
          <p className="section__text" style={{ marginTop: 16, fontSize: '0.9rem' }}>
            {member.extra}
          </p>
        )}
      </div>
    </article>
  );
}

export function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="team">
      {members.map((member) => (
        <TeamCard member={member} key={member.name} />
      ))}
    </div>
  );
}
