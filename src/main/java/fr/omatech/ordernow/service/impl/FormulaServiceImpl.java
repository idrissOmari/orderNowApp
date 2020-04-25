package fr.omatech.ordernow.service.impl;

import fr.omatech.ordernow.service.FormulaService;
import fr.omatech.ordernow.domain.Formula;
import fr.omatech.ordernow.repository.FormulaRepository;
import fr.omatech.ordernow.service.dto.FormulaDTO;
import fr.omatech.ordernow.service.mapper.FormulaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Formula}.
 */
@Service
@Transactional
public class FormulaServiceImpl implements FormulaService {

    private final Logger log = LoggerFactory.getLogger(FormulaServiceImpl.class);

    private final FormulaRepository formulaRepository;

    private final FormulaMapper formulaMapper;

    public FormulaServiceImpl(FormulaRepository formulaRepository, FormulaMapper formulaMapper) {
        this.formulaRepository = formulaRepository;
        this.formulaMapper = formulaMapper;
    }

    /**
     * Save a formula.
     *
     * @param formulaDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public FormulaDTO save(FormulaDTO formulaDTO) {
        log.debug("Request to save Formula : {}", formulaDTO);
        Formula formula = formulaMapper.toEntity(formulaDTO);
        formula = formulaRepository.save(formula);
        return formulaMapper.toDto(formula);
    }

    /**
     * Get all the formulas.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<FormulaDTO> findAll() {
        log.debug("Request to get all Formulas");
        return formulaRepository.findAll().stream()
            .map(formulaMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one formula by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<FormulaDTO> findOne(Long id) {
        log.debug("Request to get Formula : {}", id);
        return formulaRepository.findById(id)
            .map(formulaMapper::toDto);
    }

    /**
     * Delete the formula by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Formula : {}", id);
        formulaRepository.deleteById(id);
    }
}
