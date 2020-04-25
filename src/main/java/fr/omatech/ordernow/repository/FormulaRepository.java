package fr.omatech.ordernow.repository;

import fr.omatech.ordernow.domain.Formula;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Formula entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FormulaRepository extends JpaRepository<Formula, Long> {
}
