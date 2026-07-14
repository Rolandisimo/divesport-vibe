import type { Course, CourseTier } from '@/types/content';

interface CourseCardProps {
  course: Course;
  bookLabel: string;
  onBook: (bookingValue: string) => void;
}

function CourseCard({ course, bookLabel, onBook }: CourseCardProps) {
  const tagClass = course.tagVariant === 'popular' ? 'course-card__tag course-card__tag--popular' : 'course-card__tag';

  return (
    <div className="course-card">
      <span className={tagClass}>{course.tag}</span>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <div className="course-card__footer">
        <span className="course-card__price">{course.price}</span>
        <button type="button" className="btn btn--solid btn--sm" onClick={() => onBook(course.bookingValue)}>
          {bookLabel}
        </button>
      </div>
    </div>
  );
}

interface CourseCatalogProps {
  tiers: CourseTier[];
  bookLabel: string;
  onBook: (bookingValue: string) => void;
}

export function CourseCatalog({ tiers, bookLabel, onBook }: CourseCatalogProps) {
  return (
    <>
      {tiers.map((tier) => (
        <div key={tier.title}>
          <p className="course-tier">{tier.title}</p>
          <div className="course-catalog">
            {tier.courses.map((course) => (
              <CourseCard key={course.bookingValue} course={course} bookLabel={bookLabel} onBook={onBook} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
